package com.collectiverse.service.impl;

import com.collectiverse.dto.*;
import com.collectiverse.model.*;
import com.collectiverse.repository.*;
import com.collectiverse.service.CheckoutService;
import com.collectiverse.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CheckoutServiceImpl implements CheckoutService {

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final CartService cartService;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public OrderResponseDTO processCheckout(Long userId, CheckoutRequestDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address shippingAddress = addressRepository.findById(request.getShippingAddressId())
                .orElseThrow(() -> new RuntimeException("Shipping address not found"));

        Address billingAddress = addressRepository.findById(request.getBillingAddressId())
                .orElseThrow(() -> new RuntimeException("Billing address not found"));

        CartResponseDTO cart = cartService.getCart(userId);
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(shippingAddress);
        order.setBillingAddress(billingAddress);
        order.setStatus(OrderStatus.PENDING);
        order.setTotal(BigDecimal.valueOf(cart.getTotalPrice()));

        List<OrderItem> orderItems = cart.getItems().stream()
                .map(item -> {
                    Product product = productRepository.findById(item.getProductId())
                            .orElseThrow(() -> new RuntimeException("Product not found"));
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    orderItem.setProduct(product);
                    orderItem.setQuantity(item.getQuantity());
                    orderItem.setPriceAtPurchase(BigDecimal.valueOf(item.getPrice()));
                    return orderItem;
                })
                .collect(Collectors.toList());

        order.setItems(orderItems);
        Order savedOrder = orderRepository.save(order);

        // Clear the cart after successful order creation
        cartService.clearCart(userId);

        return convertToOrderResponseDTO(savedOrder);
    }

    @Override
    public List<OrderResponseDTO> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::convertToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToOrderResponseDTO(order);
    }

    @Override
    @Transactional
    public AddressDTO addAddress(Long userId, AddressDTO addressDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = new Address();
        address.setUser(user);
        address.setStreet(addressDTO.getStreet());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setCountry(addressDTO.getCountry());
        address.setZipCode(addressDTO.getZipCode());
        address.setType(addressDTO.getType());
        address.setDefault(addressDTO.isDefault());

        if (addressDTO.isDefault()) {
            addressRepository.findByUserIdAndTypeAndIsDefaultTrue(userId, addressDTO.getType())
                    .ifPresent(existingDefault -> {
                        existingDefault.setDefault(false);
                        addressRepository.save(existingDefault);
                    });
        }

        address = addressRepository.save(address);
        return convertToAddressDTO(address);
    }

    @Override
    public List<AddressDTO> getUserAddresses(Long userId, String type) {
        return addressRepository.findByUserIdAndType(userId, type).stream()
                .map(this::convertToAddressDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void setDefaultAddress(Long userId, Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getId().equals(userId)) {
            throw new RuntimeException("Address does not belong to user");
        }

        addressRepository.findByUserIdAndTypeAndIsDefaultTrue(userId, address.getType())
                .ifPresent(existingDefault -> {
                    existingDefault.setDefault(false);
                    addressRepository.save(existingDefault);
                });

        address.setDefault(true);
        addressRepository.save(address);
    }

    private OrderResponseDTO convertToOrderResponseDTO(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setId(order.getId());
        dto.setStatus(order.getStatus().name());
        dto.setTotalAmount(order.getTotal());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setShippingAddress(convertToAddressDTO(order.getShippingAddress()));
        dto.setBillingAddress(convertToAddressDTO(order.getBillingAddress()));
        dto.setOrderItems(order.getItems().stream()
                .map(this::convertToOrderItemDTO)
                .collect(Collectors.toList()));
        return dto;
    }

    private OrderItemDTO convertToOrderItemDTO(OrderItem item) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setProductTitle(item.getProduct().getName());
        dto.setQuantity(item.getQuantity());
        dto.setPriceAtPurchase(item.getPriceAtPurchase());
        dto.setSubtotal(item.getSubtotal());
        return dto;
    }

    private AddressDTO convertToAddressDTO(Address address) {
        AddressDTO dto = new AddressDTO();
        dto.setId(address.getId());
        dto.setStreet(address.getStreet());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setCountry(address.getCountry());
        dto.setZipCode(address.getZipCode());
        dto.setType(address.getType());
        dto.setDefault(address.isDefault());
        return dto;
    }
}
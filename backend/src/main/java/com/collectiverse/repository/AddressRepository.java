package com.collectiverse.repository;

import com.collectiverse.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserId(Long userId);

    List<Address> findByUserIdAndType(Long userId, String type);

    Address findByUserIdAndIsDefaultTrueAndType(Long userId, String type);

    Optional<Address> findByUserIdAndTypeAndIsDefaultTrue(Long userId, String type);
}
package com.demo.project86.repo;

import java.util.List;

import com.demo.project86.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface CustomerRepository extends JpaRepository<Customer, Long>, QuerydslPredicateExecutor<Customer> {

    List<Customer> findByLastName(String lastName);
}

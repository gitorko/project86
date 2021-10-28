package com.demo.project86.controller;

import com.demo.project86.domain.Customer;
import com.demo.project86.domain.CustomerBinderCustomizer;
import com.demo.project86.repo.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class HomeController {

    @Autowired
    CustomerRepository customerRepo;

    @GetMapping(value = "/api/customer")
    public Page<Customer> getCustomers(@PageableDefault(size = 20) Pageable pageRequest,
                                       @QuerydslPredicate(root = Customer.class, bindings = CustomerBinderCustomizer.class) com.querydsl.core.types.Predicate predicate) {
        return customerRepo.findAll(predicate, pageRequest);
    }

    @PostMapping(value = "/api/customer")
    public Customer saveCustomer(@RequestBody Customer customer) {
        log.info("Saving customer!");
        return customerRepo.save(customer);
    }

    @DeleteMapping(value = "/api/customer/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        log.info("Deleting customer: {}", id);
        customerRepo.deleteById(id);
    }

}

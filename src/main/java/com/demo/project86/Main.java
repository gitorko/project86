package com.demo.project86;

import java.util.stream.IntStream;

import com.demo.project86.domain.Customer;
import com.demo.project86.repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main implements CommandLineRunner {

    @Autowired
    CustomerRepository customerRepo;

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        customerRepo.deleteAll();
        IntStream.range(1, 300).forEach(i -> {
            customerRepo.save(Customer.builder().firstName("first_" + i).lastName("last_" + i).build());
        });

    }

}

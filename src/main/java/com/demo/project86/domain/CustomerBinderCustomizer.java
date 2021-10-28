package com.demo.project86.domain;

import java.util.Collection;
import java.util.Optional;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.querydsl.binding.MultiValueBinding;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;

public class CustomerBinderCustomizer implements QuerydslBinderCustomizer<QCustomer> {

    @Override
    public void customize(QuerydslBindings querydslBindings, QCustomer qCustomer) {
        querydslBindings.including(
                qCustomer.id,
                qCustomer.firstName,
                qCustomer.lastName,
                qCustomer.city
        );

        StringPath[] multiPropertySearchPaths = new StringPath[]{qCustomer.firstName, qCustomer.lastName, qCustomer.city};

        querydslBindings.bind(multiPropertySearchPaths).all(new MultiValueBinding<>() {
            @Override
            public Optional<Predicate> bind(StringPath path, Collection<? extends String> values) {
                BooleanBuilder predicate = new BooleanBuilder();
                values.forEach(value -> predicate.or(path.containsIgnoreCase(value)));
                return Optional.of(predicate);
            }
        });

    }
}

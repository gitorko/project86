package com.demo.project86.domain;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;

public class CustomerBinderCustomizer implements QuerydslBinderCustomizer<QCustomer> {

    @Override
    public void customize(QuerydslBindings querydslBindings, QCustomer qCustomer) {
        querydslBindings.including(
                qCustomer.id,
                qCustomer.firstName,
                qCustomer.lastName,
                qCustomer.city
        );

        // Allow case-insensitive partial searches on all strings.
        querydslBindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }
}

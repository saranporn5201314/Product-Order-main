package com.example.order_management.service;

import com.example.order_management.entity.Order;
import com.example.order_management.entity.OrderItem;
import com.example.order_management.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) {
        double grandTotal = 0;
        for (OrderItem item : order.getItems()) {
            // Validation: ราคาและจำนวนต้อง > 0
            if (item.getPrice() <= 0 || item.getQuantity() <= 0) {
                throw new IllegalArgumentException("Price and quantity must be greater than 0");
            }
            // คำนวณราคารวมต่อรายการ
            double subtotal = item.getPrice() * item.getQuantity();
            item.setSubtotal(subtotal);
            grandTotal += subtotal;
        }
        order.setTotalAmount(grandTotal);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() { return orderRepository.findAll(); }
    public void deleteOrder(Long id) { orderRepository.deleteById(id); }
}
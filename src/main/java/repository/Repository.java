package repository;

import jdbc.CondicaoWhere;

import java.util.List;

public interface Repository<T, K> {
    T findOne(K key);
    List<T> findAll();

    T add(T value);

    void update(T value);

    boolean delete(K key);

    List<T> query(CondicaoWhere params, String order);
}

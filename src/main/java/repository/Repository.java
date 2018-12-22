package repository;

import java.util.List;
import java.util.Map;

public interface Repository<T, K> {
    T findOne(K key);
    List<T> findAll();

    T add(T value);

    void update(T value);

    boolean delete(K key);

    List<T> query(Map<String, Object> params);
}

package repository;

import jdbc.Condicao;
import jdbc.CondicaoWhere;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface Repository<T, K> {
    T findOne(K key);
    List<T> findAll();

    T add(T value);

    void update(T value);

    boolean delete(K key);

    List<T> query(CondicaoWhere params);

    default <T> TypedQuery buildTypedQuery(Class<T> clazz, EntityManager em, CondicaoWhere map){
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<T> cq = criteriaBuilder.createQuery(clazz);
        Root<T> from = cq.from(clazz);
        CriteriaQuery<T> selectQuery = cq.select(from);

        if (map != null && map.size() > 0) {
            List<Predicate> predicates = new ArrayList<>();
            for (Condicao e : map.getCondicoes()) {
                if ("=".equals(e.sinal))
                    predicates.add(criteriaBuilder.and(criteriaBuilder.equal(from.get(e.chave), e.valor)));
                else if (">".equals(e.sinal)) {
                    predicates.add(criteriaBuilder.greaterThan(from.get(e.chave), (Integer)e.valor));
                } else if ("like".equals(e.sinal)) {
                    predicates.add(criteriaBuilder.and(criteriaBuilder.like(from.get(e.chave), (String)e.valor)));
                }
            }
            Predicate all = criteriaBuilder.conjunction();
            for (Predicate p : predicates) {
                all = criteriaBuilder.and(all, p);
            }
            selectQuery.where(all);
        }
        if (map.getOrdem() != null){
            selectQuery.orderBy(criteriaBuilder.asc(from.get(map.getOrdem())));
        }
        return em.createQuery(selectQuery);
    }

    default Map<String, Object> buildNativeQuery(String sql, CondicaoWhere map){
        StringBuilder baseQuery = new StringBuilder(sql);
        baseQuery.append("\n");
        Object[] params = null;
        if (map != null && map.size() > 0) {
            params = new Object[map.size()];
            baseQuery.append("WHERE\n");
            int i = 0;
            for (Condicao e : map.getCondicoes()) {
                if (i > 0) baseQuery.append("AND ");
                baseQuery.append(String.format("%s %s ?\n", e.chave, e.sinal));
                params[i++] = e.valor;
            }
        }
        if (map.getOrdem()!= null){
            baseQuery.append("ORDER BY ");
            baseQuery.append(map.getOrdem());
        }
        Map<String, Object> result = new HashMap<>();
        result.put("sql", baseQuery.toString());
        result.put("params", params);
        return result;
    }
}

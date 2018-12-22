package repository;

import entities.Aplicacao;
import jdbc.Condicao;
import jdbc.CondicaoWhere;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@JPA
@Named
@ApplicationScoped
public class AplicacaoRepositoryJPA implements AplicacaoRepository{
    @Inject
    EntityManager em;

    @Override
    public Aplicacao findOne(Integer key) {
        return em.find(Aplicacao.class, key);
    }

    @Override
    public List<Aplicacao> findAll() {
        return em.createQuery("select a from Aplicacao a").getResultList();
    }

    @Override
    public Aplicacao add(Aplicacao value) {
        em.persist(value);
        return value;
    }

    @Override
    public void update(Aplicacao value) {
        em.persist(value);
    }

    @Override
    public boolean delete(Integer key) {
        em.remove(em.find(Aplicacao.class, key));
        return true;
    }

    @Override
    public List<Aplicacao> query(CondicaoWhere map, String order) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Object> cq = criteriaBuilder.createQuery();
        Root<Aplicacao> from = cq.from(Aplicacao.class);
        CriteriaQuery<Object> selectQuery = cq.select(from);

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
        if (order != null){
            selectQuery.orderBy(criteriaBuilder.asc(from.get(order)));
        }
        TypedQuery tq = em.createQuery(selectQuery);

        return tq.getResultList();
    }

}

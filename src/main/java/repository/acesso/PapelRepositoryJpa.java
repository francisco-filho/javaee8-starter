package repository.acesso;

import entities.Papel;
import jdbc.CondicaoWhere;
import repository.Jpa;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

@Jpa
@Named
@ApplicationScoped
public class PapelRepositoryJpa implements PapelRepository{
    @Inject
    private EntityManager em;

    @Override
    public Papel findOne(Integer key) {
        return em.find(Papel.class, key);
    }

    @Override
    public List<Papel> findAll() {
        return em.createQuery("select p from Papel p").getResultList();
    }

    @Override
    public Papel add(Papel value) {
        em.persist(value);
        return value;
    }

    @Override
    public void update(Papel value) {
        em.merge(value);
    }

    @Override
    public boolean delete(Integer key) {
        Papel papel = em.find(Papel.class, key);
        em.remove(papel);
        return true;
    }

    @Override
    public List<Papel> query(CondicaoWhere params) {
        TypedQuery<Papel> q =  this.buildTypedQuery(Papel.class, em, params);
        return q.getResultList();
    }
}

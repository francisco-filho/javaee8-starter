package repository;

import entities.Aplicacao;
import jdbc.DB;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;
import java.util.Optional;

@Named
@ApplicationScoped
public class AplicacaoRepositoryJdbc implements Repository<Aplicacao, Integer> {

    @Inject
    private DB db;

    @Override
    public Aplicacao findOne(Integer key) {
        Optional<Aplicacao> app = db.queryForObject("SELECT * FROM DB2ACS.APPL WHERE CD_APPL=?", Aplicacao.class, (rs, i) -> {
            Aplicacao a = new Aplicacao();
            a.setId(rs.getInt("CD_APPL"));
            a.setNome(rs.getString("NM_APPL"));
            a.setDescricao(rs.getString("TX_DSC_APPL"));
            return a;
        }, key);
        return app.get();
    }

    @Override
    public List<Aplicacao> findAll() {
        return null;
    }

    @Override
    public Aplicacao add(Aplicacao value) {
        return null;
    }

    @Override
    public void update(Aplicacao value) {

    }

    @Override
    public boolean delete(Integer key) {
        return false;
    }
}

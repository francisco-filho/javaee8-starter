package repository;

import entities.Aplicacao;
import jdbc.DB;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.sql.ResultSet;
import java.sql.SQLException;
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
            return aplicacaoFromResultset(rs);
        }, key);
        return app.get();
    }

    @Override
    public List<Aplicacao> findAll() {
        return db.queryForList("SELECT * FROM DB2ACS.APPL", Aplicacao.class, (rs, i) -> {
            return aplicacaoFromResultset(rs);
        });
    }

    private Aplicacao aplicacaoFromResultset(ResultSet rs) throws SQLException {
        Aplicacao a = new Aplicacao();
        a.setId(rs.getInt("CD_APPL"));
        a.setNome(rs.getString("NM_APPL"));
        a.setDescricao(rs.getString("TX_DSC_APPL"));
        return a;
    }

    @Override
    public Aplicacao add(Aplicacao newApp) {
        Integer id = db.insertAndReturnId("INSERT INTO db2acs.appl (nm_appl, tx_dsc_appl) VALUES (?, ?) RETURNING cd_appl",
                newApp.getNome(), newApp.getDescricao());
        return findOne(id);
    }

    @Override
    public void update(Aplicacao app) {
        db.executeUpdate("UPDATE db2acs.appl SET nm_appl=?, tx_dsc_appl=? WHERE cd_appl=?",
                app.getNome(), app.getDescricao(), app.getId());
    }

    @Override
    public boolean delete(Integer key) {
        return db.executeUpdate("DELETE FROM db2acs.appl WHERE cd_appl=?", key) > 0;
    }
}

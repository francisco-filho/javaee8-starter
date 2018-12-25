package entities;

import javax.json.bind.annotation.JsonbPropertyOrder;
import javax.persistence.*;

@Entity
@Table(schema = "DB2ACS", name = "APPL")
@JsonbPropertyOrder({"id", "nome", "descricao"})
public class Aplicacao {
    @Id
    @SequenceGenerator(name = "db2acs.appl_cd_appl_seq", sequenceName = "db2acs.appl_cd_appl_seq", allocationSize = 1)
    @GeneratedValue(generator = "db2acs.appl_cd_appl_seq", strategy = GenerationType.IDENTITY)
    @Column(name = "CD_APPL")
    private Integer id;
    @Column(name = "NM_APPL")
    private String nome;
    @Column(name = "TX_DSC_APPL")
    private String descricao;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}

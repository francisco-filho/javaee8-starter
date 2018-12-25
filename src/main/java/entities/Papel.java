package entities;

import javax.persistence.*;

@Entity
@Table(name = "papl", schema = "db2acs")
public class Papel {
    @Id
    @SequenceGenerator(name="papl_seq", sequenceName = "db2acs.papl_cd_papl_seq")
    @GeneratedValue(generator = "papl_seq", strategy = GenerationType.SEQUENCE)
    @Column(name="cd_papl")
    private Integer cdPapel;
    @Column(name="cd_appl")
    private Integer cdApp;
    @Column(name="nm_appl")
    private String nome;
    @Column(name="tx_dcr_appl")
    private String descricao;

    public Integer getCdPapel() {
        return cdPapel;
    }

    public void setCdPapel(Integer cdPapel) {
        this.cdPapel = cdPapel;
    }

    public Integer getCdApp() {
        return cdApp;
    }

    public void setCdApp(Integer cdApp) {
        this.cdApp = cdApp;
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

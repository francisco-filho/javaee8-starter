package entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "papl", schema = "db2acs")
@Cacheable(false)
public class Papel {
    @Id
    @SequenceGenerator(name="papl_seq", sequenceName = "db2acs.papl_cd_papl_seq", allocationSize = 1)
    @GeneratedValue(generator = "papl_seq", strategy = GenerationType.SEQUENCE)
    @Column(name="cd_papl")
    private Integer cdPapel;
    @Column(name="cd_appl")
    private Integer cdApp;
    @Column(name="nm_papl")
    private String nome;
    @Column(name="tx_dcr_papl")
    private String descricao;

    @OneToMany
    @JoinColumn(name = "cd_papl", referencedColumnName = "cd_papl")
    private List<Permissao> permissoes = new ArrayList<>();

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

    public List<Permissao> getPermissoes() {
        return permissoes;
    }

    public void setPermissoes(List<Permissao> permissoes) {
        this.permissoes = permissoes;
    }
}

package entities;


import java.io.Serializable;

public class Usuario implements Serializable {
    private String nome;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}

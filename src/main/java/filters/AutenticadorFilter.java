package filters;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebFilter("/*")
public class AutenticadorFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest)servletRequest;
        HttpServletResponse resp = (HttpServletResponse)servletResponse;

//        String uri = req.getRequestURI();
//        if (uri.startsWith("/redirectme")){
//            req.getServletContext().getRequestDispatcher("/login.jsp").forward(req, resp);
//        }

        Map<String, Object> usuario = new HashMap<>();
        usuario.put("chave", "F999999");
        usuario.put("nome", "Meu Nome");

        req.getSession().setAttribute("usuario", usuario);

        filterChain.doFilter(req, resp);
    }

    @Override
    public void destroy() {

    }
}

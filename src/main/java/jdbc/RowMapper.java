package jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface RowMapper<T> {
    T rowMapper(ResultSet rs, int rowNum) throws SQLException;
}
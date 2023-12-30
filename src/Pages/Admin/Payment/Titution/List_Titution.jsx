import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { deleteSpp } from "../../../../Redux/Spp/spp_action";

const List_Titution = ({ list }) => {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteSpp(id));
  };
  return (
    <div>
      <table className="greenTable" width="100%">
        <thead>
          <tr>
            <th>Bulan</th>
            <th>Tingkat</th>
            <th>Biaya</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item) => (
            <tr key={item._id}>
              <td>{item.month}</td>
              <td>{item.grade}</td>
              <td>{`Rp ${parseFloat(item.amount).toLocaleString("id-ID")}`}</td>
              <td>
                <Box>
                  <Tooltip title="Hapus">
                    <IconButton
                      sx={{
                        bgcolor: red[500],
                        color: "whitesmoke",
                        "&:hover": { bgcolor: red[800] },
                      }}
                      onClick={() => deleteHandler(item._id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List_Titution;

import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { red } from "@mui/material/colors";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { deleteFee } from "../../../../Redux/Fee/fee_action";

const List_fee = ({ fee }) => {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteFee(id));
  };
  return (
    <div>
      <table className="greenTable">
        <thead>
          <tr>
            <th>Pembayaran</th>
            <th>Biaya</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {fee?.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{`Rp ${parseFloat(item.amount).toLocaleString("id-ID")}`}</td>
              <td>
                <Box>
                  <Tooltip>
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

export default List_fee;

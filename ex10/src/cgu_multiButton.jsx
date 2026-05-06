import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const MultiButton = (num) => {
  var output = [];
  output.push(
    <IconButton color="primary" key="1" aria-label="add to shopping cart">
      <AddShoppingCartIcon />
    </IconButton>
  );
  output.push(
    <IconButton color="primary" key="2" aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
  output.push(
    <IconButton color="primary" key="3" aria-label="add an alarm">
      <AlarmIcon />
    </IconButton>
  );
  return output;
};

export default MultiButton;
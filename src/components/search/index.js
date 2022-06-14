import "./index.css";
import Select , { SelectChangeEvent } from '@mui/material/Select';
import { connect, useDispatch, useStore } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { ADD_CATEGORY } from "../../actions/actionCreators";

function Search() {
  const dispatch = useDispatch();

  function handleSelectChange(event) {
    dispatch({
      type: ADD_CATEGORY,
      category: event.target.value,
    });
  }


  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-autowidth-label"
        style={{ color: "#000" }}>Select a category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Select a category"
          onChange={handleSelectChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="carbon">Carbon Emission</MenuItem>
          <MenuItem value="biodiversity">Bio Diversity</MenuItem>
          <MenuItem value="wildfire">Wildfire Incident</MenuItem>
        </Select>

      </FormControl>
    </div>
  );
}

const mapStateToProps = function(state) {
  return { category: state.category };
};

export default Search;


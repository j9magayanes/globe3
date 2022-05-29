import "./index.css";
import Select , { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function Search() {


  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-autowidth-label"
        style={{ color: "#000" }}>Select a category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Select a category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="carbon">Carbon Emission</MenuItem>
          <MenuItem value="wildfire">Wildfire Incidents</MenuItem>
          <MenuItem value="earthquake">Earthquake</MenuItem>
        </Select>

      </FormControl>
    </div>
    // <FormControl fullWidth >
    //   <Select
    //     labelId="demo-simple-select-label"
    //     id="demo-simple-select"
    //     label="category"
    //     onChange={handleSelectChange}
    //   >
    //     <option value="all" className="option">Select a Category</option>
    //     <option value="carbon" className="option">Carbon Emission</option>
    //     <option value="wildfire" className="option">Wildfire</option>
    //     <option value="earthquake" className="option">Money</option>
    //   </Select>
    // </FormControl>
  );
}

const mapStateToProps = function(state) {
  return { category: state.category };
};

export default Search;


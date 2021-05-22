import useStyles from './styles'
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from "material-ui-search-bar";
import { useState } from 'react';
import { Input, InputBase } from '@material-ui/core';
import { searchBar } from '../../utils/search';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPosts, searchBytitle} from '../../redux/actions/index'
const Search = () => {
    const [search,setSearch] = useState('');
    const [searchResults, setSearchResults] = useState();
    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector((state)=> state?.posts);
    const handleChange = (e)=> {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
            dispatch(searchBytitle(search))
        }else{
            dispatch(fetchPosts());
        }
    }
    return(
        <>
           <div className={classes.search}>
               
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={handleSubmit}>
            <Input
              onSubmit={console.log('E')}
              placeholder="Search..."
              onChange={handleChange}
              value={search}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            </form>
          </div>
        </>
    )
}

export default Search;
import "../globalStyles.css";
import SearchBarStyles from "../modular_css/SearchBar.module.css";

export const SearchBar = () => {


    return (
        <section className={SearchBarStyles.container}>
      <div className={SearchBarStyles.mainDiv}>
        Main Content
        <form className={SearchBarStyles.form}>
          <h3>Filter Search</h3>
          <div className={SearchBarStyles.formDiv}>
            <label>Search by ingredients</label>
            <input type="checkbox" value="ingredients" />
          </div>
          <div className={SearchBarStyles.formDiv}>
            <label>Search by meals</label>
            <input type="checkbox" value="meals" />
          </div>
          <div className={SearchBarStyles.formDiv}>
            <label>Search by location</label>
            <input type="checkbox" value="ingredients" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            autoComplete="true"
            className={SearchBarStyles.searchBar}
          />
          <button type="submit" className={SearchBarStyles.button}>
            Find Meal
          </button>
        </form>
      </div>
    </section>
    );
}
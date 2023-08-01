//set User Preferences to a form with checkboxes to save values like theme, allergens, search preferences and ect
//on form submit, post to the database, have default values set in the database for each user, 
//and have a button on the form to submit the preferred preferences to the database for the specific user

export const UserPreferences = () => {


    return (
        <section>
            <form>
                <label htmlFor="preference1">Theme: Dark</label>
                <input type="checkbox" id="preference1" value="Preference #1"/>
                <label htmlFor="preference2">Allergens</label>
                <input type="checkbox" id="preference2" value="Preference #2"/>
                {/* maybe make it so that suggestions will use a timezone if provided and prompt for meals based on time of day?? */}
                <label htmlFor="preference3">Timezone</label>
                <input type="checkbox" id="preference3" value="Preference #3"/>
                <label htmlFor="preference4">Preference 4</label>
                <input type="checkbox"id=" preference4" value="Preference #4"/>
                <label htmlFor="preference5">Preference 5</label>
                <input type="checkbox" id="preference5" value="Preference #5"/>
            </form>
        </section>
    )
}
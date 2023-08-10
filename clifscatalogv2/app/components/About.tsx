import AboutStyles from '../modular_css/About.module.css'
import "../globalStyles.css";

export const About = () => {


    return (
        <article className={AboutStyles.article}>
            <h2>Next Meal</h2>
            <p>Created from lack of inspiration, Next Meal started as a simple random meal generator. After pairing up, Clif and Jason have been able to take Next Meal a level up.</p>
            <h4>What's New</h4>
            <ul>
                <li>Create an account and sign in</li>
                <li>Favorite the best meals, skip the rest</li>
                <li>Smart Search</li>
                <li>My Sous-chef</li>
                <li>User Preferences</li>
                <li>More Recipes</li>
                <li>More Refined Results</li>
                <li>Nutrition Information</li>
            </ul>
            <br />
            <h4>My Sous-chef</h4>
            <p>One of the newer features to Next Meal that is getting some spotlight - My Sous-chef. Leveraging data from OpenAI's Chat-GPT engine, My Sous-chef is there to help even
                the pickiest of eaters find their perfect next meal.
            </p>
            <h4>User Favorites</h4>
            <p>Users may now store their favorite recipes into their dashboard, simply by clicking the favorite button alongside the recipe that is desired.
                Likewise, if you wish to remove a meal from your favorites dashboard, simply click the Remove Favorite button located alongside the recipe listed.
                No longer will users need to remember their favorites, when it is just one click away! 
            </p>
            <h4>More Recipes, Better Results</h4>
            <p>Next Meal leverages a different database for meal fetching. Currently, Next Meal leverages Spoonacular API endpoints to retrieve meal data. Spoonacular provides
                very detailed information about meals, as well as a broad selection of recipes/meals to choose from. Paired with our tools, our users can feel confident in achieving
                positive results from their search.
            </p>
            <br />
            <h3>Techy Mumbo Jumbo....</h3>
            <h4>Technologies & Tools</h4>
            <ul>
                <li>React - Front end</li>
                <li>Next.js v13.* - Serverless back end framework</li>
                <li>Prisma - Object Relational Model for communicating with the database and modeling the database schema</li>
                <li>Supabase - storing the postgresSQL database</li>
                <li>TypeScript - Type checking for error prevention and cleaner code</li>
            </ul>
        </article>
    )
}
import { Link } from "react-router-dom";

function ActionCard({ title, count, link, buttonText, showWhenZero=false}) {
   const shouldShowTitle = showWhenZero ? true : count > 0;

   return (
    <div  style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10, marginBottom: 10 }}> 

        {shouldShowTitle && (
            <h3>
                {count !== undefined && count != null ? count: " "} {title}
            </h3>
        )}

        {!shouldShowTitle && count === 0 && (
            <h3>No {title}</h3>
        )}

        <Link to={link}>
            <button>{buttonText}</button>
        </Link>

    </div>
   )
}
export default ActionCard;

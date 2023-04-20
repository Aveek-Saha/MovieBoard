import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

export default function StarRating({ ratingNumber }) {
    const totalStars = 5;
    const decimal = ratingNumber - Math.floor(ratingNumber);
    const fullNum = Array(ratingNumber - decimal)
        .fill(0)
        .map((_, i) => i);
    const halfStar = decimal == 0 ? 0 : 1;
    const remainNum = Array(totalStars - fullNum.length - halfStar)
        .fill(0)
        .map((_, i) => fullNum.length + i);

    return (
        <span>
            {fullNum.map((index) => {
                return (
                    <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className="me-1"
                    />
                );
            })}
            {decimal != 0 && (
                <FontAwesomeIcon
                    key={fullNum.length}
                    icon={faStarHalfStroke}
                    className="me-1"
                />
            )}
            {remainNum.map((index) => {
                return (
                    <FontAwesomeIcon
                        key={index}
                        icon={faStarEmpty}
                        className="me-1"
                    />
                );
            })}
        </span>
    );
}

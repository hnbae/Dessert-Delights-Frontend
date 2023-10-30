import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  // 평점을 1점 단위로 나누기
  let integerRating = Math.round(rating);
  let fullStars = null,
    emptyStars = null;
  // 왼쪽에서부터 색칠한 별 채우기
  if (integerRating > 0) {
    fullStars = Array(integerRating)
      .fill()
      .map((_, i) => (
        <FaStar key={i} value={i + 1} style={{ color: "#776E64" }} />
      ));
  }

  // 오른쪽에서부터 빈 별 채우기
  if (integerRating < 5) {
    emptyStars = Array(5 - integerRating)
      .fill()
      .map((_, i) => <FaRegStar key={i} style={{ color: "#776E64" }} />);
  }

  return (
    <span style={{ position: "relative", width: "100%", height: "20px" }}>
      {fullStars}
      {emptyStars}
    </span>
  );
};

export default StarRating;

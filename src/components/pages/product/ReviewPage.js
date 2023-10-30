import { useEffect, useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import styled from "styled-components";
const ReviewPage = () => {
  const [review, setReview] = useState({ rate: 5, title: "", comment: "" });

  const [rating, setRating] = useState(review.rate);
  const reviewTitle = useRef("");
  const reviewComment = useRef("");
  const handleStarClick = (value) => {
    setRating(value);
  };

  useEffect(() => {
    console.log(review);
  }, [rating, review]);

  const onSubmit = () => {
    setReview({
      rate: rating,
      title: reviewTitle.current.value,
      comment: reviewComment.current.value,
    });
  };

  return (
    <MainBox>
      <div className="review_page">
        <div className="review_header">
          <h1>후기 작성</h1>
        </div>
        <table className="review_tbl">
          <tbody>
            <tr>
              <th className="review_rateHead">별점</th>
              <td>
                <div>
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <span key={starValue}>
                        {rating >= starValue ? (
                          <FaStar
                            onClick={() => handleStarClick(starValue)}
                            style={{
                              color: "#776E64",
                              marginRight: "3px",
                              cursor: "pointer",
                            }}
                            size="1.5rem"
                          />
                        ) : (
                          <FaRegStar
                            onClick={() => handleStarClick(starValue)}
                            style={{
                              color: "#776E64",
                              marginRight: "3px",
                              cursor: "pointer",
                            }}
                            size="1.5rem"
                          />
                        )}
                      </span>
                    );
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <th className="review_title">제목</th>
              <td>
                <input className="review_title_input" />
              </td>
            </tr>
            <tr>
              <th rowSpan={2} className="review_comment">
                내용
              </th>
              <td>
                <textarea className="review_comment_input" />
              </td>
            </tr>
            <tr class="btnTr">
              <td>
                <button className="btnCancel">취소</button>
                <button className="btnSubmit" onClick={onSubmit}>
                  등록
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainBox>
  );
};

export default ReviewPage;

const MainBox = styled.div`
  min-height: 850px;
  color: #776e64;

  .review_page {
    width: 100%;
    padding: 100px, auto;
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
  }

  .review_header {
    font-style: normal;
    font-family: "Gothic";
    font-weight: 400;
    font-size: 40px;
    line-height: 130%;
    letter-spacing: -0.5px;

    /* display: flex;
    align-items: center; */
    text-align: center;
    margin-bottom: 20px;

    /* $-beige-600 */

    color: #b2a495;

    text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  }

  .review_tbl {
    width: 64%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    height: 468px;
    font-family: "NanumGothicCoding";
    font-style: normal;
    color: #3b3732;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 130%;
  }

  .review_tbl th {
    width: 120px;
  }

  .review_tbl td {
    border-top: 20px solid #ffffff00;
    border-bottom: 20px solid #ffffff00;
  }

  .review_tbl input {
    width: 100%;
    background: #f8f1e9;

    border: none;
  }

  .review_title_input {
    height: 30px;
  }

  .review_comment_input {
    width: 100%;
    background: #f8f1e9;
    resize: none;
    overflow-y: auto;
    border: none;
    height: 320px;
    width: 100%;
    vertical-align: top;
  }

  .btnCancel {
    /* Auto layout */
    padding: 0px 8px;

    width: 100px;
    height: 40px;

    /* $-beige-100 */

    background: #fbf8f4;
    /* $-beige-600 */

    border: 1px solid #b2a495;
    border-radius: 1000px;
    margin-right: 20px;

    cursor: pointer;
  }
  .btnCancel:hover {
    font-weight: bold;
    color: #fbf8f4;
    background: #776e64;
    transition: 0.3s;
  }

  .btnSubmit {
    padding: 0px 8px;

    width: 100px;
    height: 40px;

    /* $-beige-100 */

    background: #fbf8f4;
    /* $-beige-700 */

    border: 1px solid #776e64;
    border-radius: 1000px;

    cursor: pointer;
  }
  .btnSubmit:hover {
    font-weight: bold;
    color: #fbf8f4;
    background: #776e64;
    transition: 0.3s;
  }

  .btnTr {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 30px;
  }
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
  
  position: relative;
  width: 150px;
  height: 38px;
  left: 800px;
  top: 0px;
  
  border: 1px solid #f1e2d2;
  border-radius: 50px;
  
  background: #eddbc7;
  color: #776e64;
  font-size: 20px;
  cursor: pointer;
  
  &:hover {
    font-weight: bold;
    color: #776e64;
    background: #776e64;
    transition: 0.3s;
  } */
`;

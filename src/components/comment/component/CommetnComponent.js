import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommentItem } from './CommentItem';

const CommentComponent = ({ commentData, depth = 0, onPressAnsswer, token, onDeletComment, categoryID }) => {
    const mounth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const renderComment = (comment, index) => {
        const givenDate = new Date(comment.created_at);
        const currentDate = new Date();
        const timeDifference = currentDate - givenDate;
        let dayOfMonth = currentDate.getDate();
        let hour = currentDate.getHours();
        let minute = currentDate.getMinutes();
        const Mounth = currentDate.getMonth()
        if (minute <= 9) {
            minute = `0${minute}`
        }
        if (hour <= 9) {
            hour = `0${hour}`
        }
        if (dayOfMonth <= 9) {
            dayOfMonth = `0${dayOfMonth}`
        }
        daysAgo = `${dayOfMonth} ${mounth[Mounth]} в ${hour}:${minute}`
        return <View key={index}>
            <CommentItem
                text={comment.comment}
                owner={false}
                ansswer={true}
                replay={comment.replay}
                parent_id={comment.parent_id}
                user={comment.user}
                like_count={comment.likes_count}
                isLiked={comment.like_auth_user?.length}
                id={comment.id}
                token={token}
                daysAgo={daysAgo}
                onPressAnsswer={onPressAnsswer}
                onDeletComment={onDeletComment}
                categoryID={categoryID}
            />
            {/* <View style={{ marginLeft: 20 }}>
                {comment.replay.map(review => renderCommentReview(review, depth + 1))}
            </View> */}
        </View>
    };

    const renderCommentReview = (review, reviewDepth) => {
        const givenDate = new Date(review.created_at);
        const currentDate = new Date();
        const timeDifference = currentDate - givenDate;
        let daysAgo = (timeDifference / (1000 * 60 * 60 * 24))
        if (+daysAgo < 1) {
            daysAgo = daysAgo * 24
            if (daysAgo <= 1) {
                daysAgo = Math.floor(daysAgo * 60) + 'минут назад'
            }
            else {
                daysAgo = Math.floor(daysAgo) + 'часов назад'
            }
        }
        else {
            daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + ' дней назад';
        }
        return <View key={review.comment} style={[styles.reviewContainer]}>
            <CommentItem
                text={review.comment}
                owner={false}
                ansswer={true}
                replay={review.replay}
                user={review.user}
                like_count={review.likes_count}
                isLiked={review.like_auth_user?.length}
                id={review.id}
                token={token}
                daysAgo={daysAgo}
                onPressAnsswer={onPressAnsswer}
                categoryID={categoryID}
            />
            {review.replay.map(subReview => renderCommentReview(subReview, reviewDepth + 1))}
        </View>
    };

    return (
        <View style={{ marginLeft: 10 }}>
            {commentData.map((comment, index) => renderComment(comment, index))}
        </View>
    );
};

const styles = StyleSheet.create({
    reviewContainer: {
        marginBottom: 10,
    },
});

export default CommentComponent;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CommentItem } from './CommentItem';

const CommentComponent = ({ commentData, depth = 0, onPressAnsswer, token }) => {
    const maxMargin = 20;
    const margin = Math.min(20 + depth * 20, maxMargin);

    const renderComment = (comment) => {
        console.log(comment)
        return <View key={comment.comment} style={[styles.commentContainer, { marginLeft: margin }]}>
            {/* <Text>{comment.comment}</Text> */}
            <CommentItem
                text={comment.comment}
                owner={false}
                ansswer={true}
                replay={comment.replay}
                user={comment.user}
                like_count={comment.likes_count}
                isLiked={comment.like_auth_user?.length}
                id={comment.id}
                token={token}
                // daysAgo={daysAgo}
                onPressAnsswer={onPressAnsswer}
            />
            {comment.replay.map(review => renderCommentReview(review, depth + 1))}
        </View>
    };

    const renderCommentReview = (review, reviewDepth) => (
        <View key={review.comment} style={[styles.reviewContainer, { marginLeft: margin }]}>
            {/* <Text>{review.comment}</Text> */}
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
                // daysAgo={daysAgo}
                onPressAnsswer={onPressAnsswer}
            />
            {review.replay.map(subReview => renderCommentReview(subReview, reviewDepth + 1))}
        </View>
    );

    return (
        <View>
            {commentData.map(comment => renderComment(comment))}
        </View>
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        marginBottom: 10,
    },
    reviewContainer: {
        marginBottom: 10,
    },
});

export default CommentComponent;
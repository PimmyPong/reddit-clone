"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faReply } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function Reply({ comment, postId }) {
	const [replyText, setReplyText] = useState("");
	const [isReply, setIsReply] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editReplyComment, setEditReplyComment] = useState(comment.message);

	const [error, setError] = useState("");
	const router = useRouter();

	async function handleClick(e) {
		e.preventDefault();

		const response = await fetch(`/api/posts/`, {
			method: "POST",
			body: JSON.stringify({
				message: replyText,
				subredditId: comment.subredditId,
				parentId: postId,
			}),
		});
		const info = await response.json();
		if (info.error) {
			setError(info.error);
			router.refresh();
		}
		setIsReply(false);
		setReplyText("");
		router.refresh();
	}

	function replyBox(e) {
		e.preventDefault();
		setIsReply(true);
		router.refresh();
	}
	function cancel() {
		setIsReply(false);
	}

	function handleIsEdit() {
		setIsEdit(true);
		router.refresh();
	}

	async function handleEdit(e) {
		e.preventDefault();
		const response = await fetch(`/api/posts/${comment.id}`, {
			method: "PUT",
			body: JSON.stringify({
				message: editReplyComment,
			}),
		});
		const info = await response.json();
		router.refresh();
		if (info.error) {
			setError(info.error);
			router.refresh();
		}
		setIsEdit(false);
	}
	return (
		<div className="reply11">
			<div className="reply-1">
				<div className="reply-2-vertical">
					{/* user is undefined */}
					Reply by: {comment.user.username}
					<div className="reply-3">{comment.message}</div>
					<div className="reply-4-flex-btn">
						<span type="button">
							<svg
								fill="#000000"
								width="30px"
								height="20px"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
							</svg>
						</span>
						<span type="button">
							<svg
								fill="#000000"
								width="20px"
								height="20px"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z" />
							</svg>
						</span>
						{/* edit */}
						{isEdit && (
							<form>
								<textarea
									className="isEdit-2"
									type="text"
									value={editReplyComment}
									onChange={(e) => setEditReplyComment(e.target.value)}
								/>
								<div className="edit-comment-btnCon">
									<button
										className="edit-btn"
										type="button"
										onClick={handleEdit}>
										Edit
									</button>
									<button className="cancel">Cancel</button>
								</div>
							</form>
						)}

						<span type="button" onClick={handleIsEdit}>
							<FontAwesomeIcon icon={faPenToSquare} /> Edit
						</span>
						{/* reply */}
						{isReply ? (
							<div>
								<form>
									<textarea
										className="reply-textarea"
										type="text"
										placeholder="Reply"
										value={replyText}
										onChange={(e) => setReplyText(e.target.value)}
									/>
								</form>
								<button
									className="reply-btn"
									type="button"
									onClick={handleClick}>
									Reply
								</button>
								<button className="reply-btn" onClick={cancel}>
									Cancel
								</button>
							</div>
						) : (
							<span type="button" onClick={replyBox}>
								<FontAwesomeIcon icon={faReply} /> Reply
							</span>
						)}
						{/* delete */}
						<span type="button">
							<FontAwesomeIcon icon={faTrashAlt} /> Delete
						</span>
					</div>
					<p>{error}</p>
				</div>
			</div>
		</div>
	);
}

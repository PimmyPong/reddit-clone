"use client";
import Link from "next/link.js";
import { useState } from "react";
import { useRouter } from "next/navigation.js";
import Delete from "./Delete.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Vote from "./Vote.jsx";

export default function Post({ subreddit, post, comments, user, vote }) {
	const [isEdit, setIsEdit] = useState(false);
	const [editTitle, setEditTitle] = useState(post.title);
	const [message, setEditMessage] = useState(post.message);
	const [error, setError] = useState("");

	const router = useRouter();

	function handleIsEdit() {
		setIsEdit(true);
		router.refresh();
	}

	async function handleEdit(e) {
		e.preventDefault();
		const response = await fetch(`/api/posts/${post.id}`, {
			method: "PUT",
			body: JSON.stringify({
				title: editTitle,
				message: message,
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
		<div className="container-posts-vt-pt-column">
			<div className="con-posts-vt-pt-column">
				<div className="vote-con">
					<Vote post={post} vote={vote} />
					{/* <span type="button">
						<svg
							fill="#000000"
							width="30px"
							height="20px"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
						</svg>
					</span>
					<br />
					<span type="button">
						<svg
							fill="#000000"
							width="20px"
							height="20px"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z" />
						</svg>
					</span> */}
				</div>

				<div>
					<div>
						<span className="post-header">
							<Link
								href={`/subreddits/${post.subredditId}`}
								style={{ textDecoration: "none" }}>
								<span className="r">/r {subreddit.name}</span>
							</Link>
							<span className="post-by">
								• Posted by: u/{user.username} at{" "}
								{new Date(post.createdAt).toLocaleString()}
							</span>
						</span>

						<div className="title">{post.title}</div>
					</div>
					<div>{post.message}</div>
					<div className="edit-delete">
						<span>
							<Link
								href={`/posts/${post.id}`}
								style={{ textDecoration: "none" }}>
								<FontAwesomeIcon icon={faComment} />
								<span className="comment-count"> Comments: {comments}</span>
							</Link>
						</span>
						{/* edit */}
						<span className="edit" onClick={handleIsEdit} type="button">
							<FontAwesomeIcon icon={faPenToSquare} /> Edit
						</span>

						<Delete post={post} />

						<p>{error}</p>
					</div>

					{isEdit && (
						<form>
							<textarea
								required
								className="isEdit-1"
								type="text"
								value={editTitle}
								onChange={(e) => setEditTitle(e.target.value)}
							/>
							<textarea
								required
								className="isEdit-2"
								type="text"
								value={message}
								onChange={(e) => setEditMessage(e.target.value)}
							/>
							<div className="edit-comment-btnCon">
								<button className="edit-btn" type="button" onClick={handleEdit}>
									Edit
								</button>
								<button className="cancel">Cancel</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}

"use client";
import Link from "next/link.js";
import CreateComment from "./CreateComment.jsx";
import { useState } from "react";
import { useRouter } from "next/navigation.js";
import Delete from "./Delete.jsx";
export default function Post({
	subreddit,
	post,
	commentsCount,
	comments,
	user,
}) {
	const [isEdit, setIsEdit] = useState(false);
	const [editTitle, setEditTitle] = useState(post.title);
	const [message, setEditMessage] = useState(post.message);
	const [isComment, setIsComment] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();

	function handleIsEdit() {
		setIsEdit(true);
		// setError("");
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
		setIsEdit(false);
		router.refresh();
		if (info.error) {
			setError(info.error);
			router.refresh();
		}
	}

	return (
		<div>
			<div className="box-post">
				<div>
					<div>
						<span className="post-header">
							<Link
								href={`/subreddits/${post.subredditId}`}
								style={{ textDecoration: "none" }}>
								<span className="r">/r {subreddit.name}</span>
							</Link>
							<span className="post-by">
								{`Posted by: u/${user.username} at ${new Date(
									post.createdAt
								).toLocaleString()}`}
							</span>
						</span>
					</div>
					<div className="title">{post.title}</div>
				</div>
				<div>{post.message}</div>
				<div className="edit-delete">
					<span>
						<Link href={`/posts/${post.id}`} style={{ textDecoration: "none" }}>
							💬
							<span className="comment-count">Comments: {commentsCount}</span>
						</Link>
					</span>

					<span className="edit" onClick={handleIsEdit} type="button">
						✏️
					</span>

					<Delete post={post} />

					<p>{error}</p>
				</div>
				{isEdit && (
					<form>
						<textarea
							className=""
							type="text"
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
						/>
						<textarea
							className=""
							type="text"
							value={message}
							onChange={(e) => setEditMessage(e.target.value)}
						/>
						<div className="edit-comment-btnCon">
							<button className="edit-btn" type="button" onClick={handleEdit}>
								Edit
							</button>
							<button>Cancel</button>
						</div>
					</form>
				)}

				<CreateComment comments={comments} />
			</div>
		</div>
	);
}

// filepath: src/components/Commentar.jsx
import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { addDoc, collection, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase-comment';
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";

const Comment = memo(({ comment, formatDate, index }) => (
    <div className="px-4 pt-4 pb-3 rounded-xl bg-[#11131d]/90 border border-white/10 transition-all group hover:-translate-y-0.5 hover:border-[#f6c500]/50 hover:shadow-[0_15px_45px_rgba(246,197,0,0.15)]">
        <div className="flex items-start gap-3">
            <div className="p-2 text-[#f6c500] transition-colors rounded-full bg-[#f6c500]/20 group-hover:bg-[#f6c500]/30">
                <UserCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <h4 className="font-medium text-white truncate">{comment.userName}</h4>
                    <span className="text-xs text-[#9aa0bd] whitespace-nowrap">
                        {formatDate(comment.createdAt)}
                    </span>
                </div>
                <p className="text-sm leading-relaxed text-[#cbd1ec] break-words">{comment.content}</p>
            </div>
        </div>
    </div>
));

const CommentForm = memo(({ onSubmit, isSubmitting, error }) => {
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');
    const textareaRef = useRef(null);

    const handleTextareaChange = useCallback((e) => {
        setNewComment(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!newComment.trim() || !userName.trim()) return;
        onSubmit({ newComment, userName });
        setNewComment('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }, [newComment, userName, onSubmit]);

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1000">
                <label className="block text-sm font-medium text-white">
                    Name <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-3 text-[#f5f7ff] placeholder-[#707693] transition-all border rounded-xl bg-[#0f111c]/90 border-white/10 focus:outline-none focus:border-[#f6c500] focus:ring-2 focus:ring-[#f6c500]/20"
                    required
                />
            </div>

            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1200">
                <label className="block text-sm font-medium text-white">
                    Message <span className="text-red-400">*</span>
                </label>
                <textarea
                    ref={textareaRef}
                    value={newComment}
                    onChange={handleTextareaChange}
                    placeholder="Write your message here..."
                    className="w-full p-4 rounded-xl bg-[#0f111c]/90 border border-white/10 text-[#f5f7ff] placeholder-[#707693] focus:outline-none focus:border-[#f6c500] focus:ring-2 focus:ring-[#f6c500]/20 transition-all resize-none min-h-[120px]"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                data-aos="fade-up" data-aos-duration="1000"
                className="relative w-full h-12 bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(246,197,0,0.25)] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
                <div className="absolute inset-0 transition-transform duration-300 translate-y-12 bg-white/20 group-hover:translate-y-0" />
                <div className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Posting...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span>Post Comment</span>
                        </>
                    )}
                </div>
            </button>
        </form>
    );
});

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            once: false,
            duration: 1000,
        });
    }, []);

    useEffect(() => {
        const commentsRef = collection(db, 'portfolio-comments');
        const q = query(commentsRef, orderBy('createdAt', 'desc'));
        
        return onSnapshot(q, (querySnapshot) => {
            const commentsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(commentsData);
        });
    }, []);

    const handleCommentSubmit = useCallback(async ({ newComment, userName }) => {
        setError('');
        setIsSubmitting(true);
        
        try {
            await addDoc(collection(db, 'portfolio-comments'), {
                content: newComment,
                userName,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            setError('Failed to post comment. Please try again.');
            console.error('Error adding comment: ', error);
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const formatDate = useCallback((timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }, []);

    return (
        <div className="w-full overflow-hidden shadow-xl rounded-2xl border border-white/10 bg-gradient-to-br from-[#1c1f2c]/90 via-[#141623]/95 to-[#0b0c13] backdrop-blur-xl" data-aos="fade-up" data-aos-duration="1000">
            <div className="p-6 border-b border-white/10 bg-[#0f111c]/80" data-aos="fade-down" data-aos-duration="800">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#f6c500]/20">
                        <MessageCircle className="w-6 h-6 text-[#f6c500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                        Comments <span className="text-[#f6c500]">({comments.length})</span>
                    </h3>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {error && (
                    <div className="flex items-center gap-2 p-4 text-[#ff9bb3] border bg-[#2a0f18] border-[#ff5f8f]/40 rounded-xl" data-aos="fade-in">
                        <AlertCircle className="flex-shrink-0 w-5 h-5" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                
                <div>
                    <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} error={error} />
                </div>

                <div className="space-y-4 h-[300px] overflow-y-auto custom-scrollbar" data-aos="fade-up" data-aos-delay="200" style={{ height: '450px' }}>
                    {comments.length === 0 ? (
                        <div className="py-8 text-center" data-aos="fade-in">
                            <UserCircle2 className="w-12 h-12 mx-auto mb-3 text-[#38bdf8] opacity-50" />
                            <p className="text-[#848aab]">No comments yet. Start the conversation!</p>
                        </div>
                    ) : (
                        comments.map((comment, index) => (
                            <Comment 
                                key={comment.id} 
                                comment={comment} 
                                formatDate={formatDate}
                                index={index}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
/*
    @Diegoson
*/

async function fetchAndDisplayMessages() {
    try {
        const response = await fetch('/api/messages');
        if (!response.ok) {
            throw new Error('error messages');
        }
        const messages = await response.json();
        const messagesDiv = document.getElementById('messages');
        
        messagesDiv.innerHTML = '';

        messages.forEach(message => {
            const { username, timestamp, message: content } = message;
            const messageHTML = `
                <div class="message">
                    <strong>${username}</strong>
                    <span>${timestamp}</span>
                    <p>${content}</p>
                    <div class="message-actions">
                        <button class="reply-btn" onclick="toggleReplyForm(this)">Reply</button>
                        <div class="reactions">
                            <span class="reaction" onclick="reactToMessage(this)"><i class="far fa-thumbs-up"></i></span>
                            <span class="reaction" onclick="reactToMessage(this)"><i class="far fa-heart"></i></span>
                            <span class="reaction" onclick="reactToMessage(this)"><i class="far fa-laugh"></i></span>
                            <span class="reaction" onclick="reactToMessage(this)"><i class="far fa-sad"></i></span>
                        </div>
                    </div>
                    <div class="reply-form" style="display: none;">
                        <input type="text" class="message-input" placeholder="Reply to ${username}'s message">
                        <button class="submit-button" onclick="sendReply(this)">Send</button>
                    </div>
                </div>
            `;
            messagesDiv.innerHTML += messageHTML;
        });

    } catch (error) {
        console.error(error);
    }
}

async function sendMessage() {
    var username = document.getElementById('username').value;
    var message = document.getElementById('message').value;
    if (username && message) {
        var currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        var messageData = { username, message };
        
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            if (!response.ok) {
                throw new Error('error messages');
            }

            document.getElementById('message').value = '';

            fetchAndDisplayMessages();

        } catch (error) {
            console.error('Error sending message:', error);
            alert('Please try again.');
        }

    } else {
        alert('Please enter your message');
    }
}

function toggleReplyForm(btn) {
    var replyForm = btn.parentElement.parentElement.querySelector('.reply-form');
    if (replyForm.style.display === 'none') {
        replyForm.style.display = 'flex';
    } else {
        replyForm.style.display = 'none';
    }
}


async function sendReply(btn) {
    var username = document.getElementById('username').value;
    var replyInput = btn.parentElement.querySelector('.message-input').value;
    if (replyInput) {
        var currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        var replyData = {
            username: username,
            message: replyInput
        };

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(replyData),
            });

            if (!response.ok) {
                throw new Error('Couldnt send reply');
            }

            
            fetchAndDisplayMessages();

            
            btn.parentElement.style.display = 'none';

        } catch (error) {
            console.error(error);
            alert('Please try again');
        }
    } else {
        alert('Please enter your reply.');
    }
}


function reactToMessage(span) {
    if (!span.classList.contains('reacted')) {
        span.classList.add('reacted');
    } else {
        span.classList.remove('reacted');
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayMessages);
                         

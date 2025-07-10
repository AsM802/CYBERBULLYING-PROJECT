async function postComment() {
    const commentBox = document.getElementById('comment');
    if (!commentBox) {
        console.error('❌ Comment box not found!');
        return false;
    }

    const comment = commentBox.value.trim();
    console.log(`📝 Comment Submitted: "${comment}"`);

    

    try {
        console.log('🚀 Sending request to backend...');
        const response = await fetch('http://127.0.0.1:5000/validate-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: comment })
        });

        console.log('✅ Response received from backend!');
        const data = await response.json();
        console.log('📩 Backend Response:', data);

        if (data.prediction === 0) {
            showModal('Thank you for being respectful!✅ Your comment has been posted', 'white');
        } else {
            showModal('Your comment containing Cyberbulling . Your comment has been blocked.❌', 'white');
        }

        commentBox.value = '';  // Clear the comment box after submission
        return false;  // Prevent form submission
    } catch (error) {
        console.error('❌ Fetch error:', error);
        showModal('An error occurred while submitting your comment. Please try again later.', 'red');
        return false;  // Prevent form submission
    }
}



function showModal(message, color) {
    const modal = document.getElementById('message-modal');
    const modalMessage = document.getElementById('modal-message');

    if (!modal || !modalMessage) {
        console.error('❌ Modal elements not found!');
        return false;
    }

    modalMessage.textContent = message;
    modalMessage.style.color = color;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('message-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('message-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
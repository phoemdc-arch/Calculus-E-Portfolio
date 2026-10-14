// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Artifact Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const artifactCards = document.querySelectorAll('.artifact-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active styling from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('bg-purple-600', 'text-white', 'shadow-md', 'shadow-purple-600/30');
            btn.classList.add('bg-slate-900', 'border', 'border-purple-900/60', 'text-slate-300');
        });

        // Add active styling to clicked button
        button.classList.remove('bg-slate-900', 'border', 'border-purple-900/60', 'text-slate-300');
        button.classList.add('bg-purple-600', 'text-white', 'shadow-md', 'shadow-purple-600/30');

        const filterValue = button.getAttribute('data-filter');

        artifactCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Image Upload Handler for Artifacts
function handleImageUpload(event, cardId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const card = document.getElementById(cardId);
            if (card) {
                const previewImg = card.querySelector('.custom-preview-img');
                const defaultBanner = card.querySelector('.default-banner');

                if (previewImg && defaultBanner) {
                    previewImg.src = e.target.result;
                    previewImg.classList.remove('hidden');
                    defaultBanner.style.opacity = '0.2'; // Dim default banner so custom image stands out
                }
            }
        };
        reader.readAsDataURL(file);
    }
}

// Modal Controls
function openModal(title, description) {
    const modal = document.getElementById('reflection-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    if (modal && modalTitle && modalDescription) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeModal() {
    const modal = document.getElementById('reflection-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Close modal on outside click
window.addEventListener('click', (event) => {
    const modal = document.getElementById('reflection-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Copy Submission File Name
function copyFileName() {
    const filenameText = document.getElementById('filename-text').textContent;
    const copyBtnText = document.getElementById('copy-btn-text');

    navigator.clipboard.writeText(filenameText).then(() => {
        copyBtnText.textContent = 'Copied!';
        setTimeout(() => {
            copyBtnText.textContent = 'Copy File Name';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
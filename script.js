document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    // Configuração inicial
    let currentLang = 'pt';
    updateContent(currentLang);

    // Event listeners para os botões de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang !== currentLang) {
                currentLang = lang;
                updateContent(lang);
                
                // Atualiza botões ativos
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        const scrollPos = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
});

function updateContent(lang) {
    // Atualiza todos os elementos com conteúdo traduzível
    document.querySelectorAll('[data-lang]').forEach(element => {
        element.classList.toggle('active', element.getAttribute('data-lang') === lang);
    });
}

let isEnglish = false;

// Exemplo de conteúdo em inglês
const englishContent = {
    about: {
        title: "About Me",
        description: "Computer Engineering student at FACENS, passionate about technology..."
    },
    skills: {
        technical: {
            title: "Technical Skills",
            development: "Development",
            database: "Database",
            tools: "Tools & Technologies"
        },
        soft: {
            title: "Soft Skills",
            problemSolving: "Problem Solving",
            teamwork: "Teamwork",
            communication: "Communication",
            organization: "Organization",
            adaptability: "Adaptability"
        }
    },
    experience: {
        title: "Professional Experience",
        current: {
            company: "Smash Center",
            position: "Administrative and Marketing Assistant",
            period: "2021 - 2023"
        }
    }
};

// Exemplo de como atualizar o conteúdo
function updateContent(isEnglish) {
    if (isEnglish) {
        // Atualiza para inglês
        document.querySelector('.about h2').textContent = englishContent.about.title;
        // ... atualizar outros elementos
    } else {
        // Volta para português
        document.querySelector('.about h2').textContent = 'Sobre Mim';
        // ... atualizar outros elementos
    }
}

// Adicionar div necessária para o Google Translate
document.body.insertAdjacentHTML('beforeend', '<div id="google_translate_element" style="display: none;"></div>');

document.getElementById('translateBtn').addEventListener('click', function() {
    const iframe = document.getElementsByClassName('goog-te-banner-frame')[0];
    if (!iframe) return;

    const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    const comboBox = innerDoc.getElementsByClassName('goog-te-combo')[0];

    if (comboBox) {
        comboBox.value = 'en';
        comboBox.dispatchEvent(new Event('change'));
        
        // Atualiza o texto do botão
        const translateText = document.getElementById('translateText');
        translateText.textContent = comboBox.value === 'en' ? 'Português' : 'English';
    }
});

document.getElementById('languageToggle').addEventListener('click', function() {
    const ptVersion = document.getElementById('pt-version');
    const enVersion = document.getElementById('en-version');
    const langText = document.getElementById('langText');

    if (ptVersion.style.display !== 'none') {
        ptVersion.style.display = 'none';
        enVersion.style.display = 'block';
        langText.textContent = 'Português';
    } else {
        ptVersion.style.display = 'block';
        enVersion.style.display = 'none';
        langText.textContent = 'English';
    }
}); 
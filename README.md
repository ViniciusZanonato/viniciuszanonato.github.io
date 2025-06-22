# 🌟 Currículo Online - Carlos Vinicius Garcia Zanonato

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)

## 📋 Sobre o Projeto

Currículo online moderno e responsivo desenvolvido para apresentar minha trajetória profissional, formação acadêmica e projetos. O site foi construído com foco em design elegante, experiência do usuário e performance otimizada.

🔗 **[Ver Site Online](https://viniciuszanonato.github.io)** *(substitua pela URL quando hospedar)*

## ✨ Características

### 🎨 **Design & UX**
- ✅ **Dark Mode Fixo** - Interface elegante e moderna
- ✅ **Gradientes Neon** - Cores vibrantes (roxo/vermelho)
- ✅ **Animações Suaves** - Transições e efeitos hover
- ✅ **Tipografia Moderna** - Fonte Inter do Google Fonts
- ✅ **Layout Limpo** - Organização visual profissional

### 📱 **Responsividade**
- ✅ **Mobile-First** - Otimizado para todos os dispositivos
- ✅ **Menu Mobile** - Hamburger menu para telas pequenas
- ✅ **Grid Adaptativo** - Layout que se ajusta automaticamente
- ✅ **Imagens Responsivas** - Carregamento otimizado

### 🚀 **Funcionalidades**
- ✅ **Navegação Suave** - Scroll suave entre seções
- ✅ **Formulário de Contato** - Envio real de email via mailto
- ✅ **Back to Top** - Botão para voltar ao topo
- ✅ **Animações on Scroll** - Elementos aparecem ao rolar a página
- ✅ **Links Externos** - LinkedIn e GitHub integrados

### ⚡ **Performance**
- ✅ **CDN Optimizado** - TailwindCSS via CDN
- ✅ **Imagens Otimizadas** - Organizadas em pasta separada
- ✅ **CSS Minimalista** - Apenas estilos personalizados necessários
- ✅ **JavaScript Puro** - Sem dependências pesadas

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilos personalizados
- **JavaScript (Vanilla)** - Interatividade e funcionalidades
- **TailwindCSS** - Framework CSS utilitário
- **Font Awesome** - Ícones profissionais
- **Google Fonts** - Tipografia (Inter)

### **Ferramentas & Recursos**
- **Git** - Controle de versão
- **GitHub Pages** - Hospedagem gratuita
- **Responsive Design** - Mobile-first approach
- **SEO Friendly** - Meta tags otimizadas

## 📁 Estrutura do Projeto

```
Site-Curriculo/
│
├── 📄 index.html          # Página principal
├── 🎨 styles.css          # Estilos personalizados
├── 📖 README.md           # Documentação do projeto
│
└── 📁 images/             # Pasta de imagens
    ├── 🖼️ fotocurriculo.png    # Foto pessoal
    ├── 🏫 LogoAMF.png          # Logo Antonio Meneghetti Faculdade
    ├── 🏫 LogoOsvaldo.jpg      # Logo Escola Osvaldo Cruz
    ├── 🚀 LogoZion.png         # Logo Projeto ZION
    └── 🧠 LogoNeuroLearn.png   # Logo Projeto NeuroLearn
```

## 🎯 Seções do Site

### 🏠 **Início (Hero)**
- Apresentação pessoal com foto
- Nome e título profissional
- Resumo da trajetória
- Call-to-actions (Contato/Saiba mais)

### 👤 **Sobre**
- Informações pessoais completas
- Resumo profissional detalhado
- Principais competências
- Dados de contato

### 💼 **Experiência Profissional**
- Timeline interativa
- Cargos e responsabilidades
- Períodos e localizações
- Descrições detalhadas

### 🎓 **Formação Acadêmica**
- Cards com logos das instituições
- Cursos e períodos
- Conquistas e participações

### 🚀 **Projetos**
- Projetos destacados (ZION, NeuroLearn)
- Links para GitHub
- Tecnologias utilizadas
- Descrições e objetivos

### 📚 **Cursos e Certificações**
- Grid de cursos complementares
- Áreas de especialização
- Instituições e plataformas

### 📧 **Contato**
- Formulário funcional de contato
- Informações diretas (email, localização, LinkedIn)
- Envio real via mailto

## 🚀 Como Executar

### **Localmente**
1. Clone o repositório:
```bash
git clone https://github.com/ViniciusZanonato/curriculo-online.git
```

2. Navegue até a pasta:
```bash
cd curriculo-online
```

3. Abra o arquivo `index.html` no navegador ou use um servidor local:
```bash
# Com Python
python -m http.server 8000

# Com Node.js (live-server)
npx live-server
```

### **Hospedagem no GitHub Pages**
1. Faça fork do repositório
2. Vá em `Settings` > `Pages`
3. Selecione `Deploy from a branch` > `main`
4. Site estará disponível em `https://seuusuario.github.io/curriculo-online`

## 🎨 Personalização

### **Cores (Tailwind Config)**
```javascript
colors: {
    darkgray: '#1E1E1E',    // Background escuro
    neonpurple: '#9D4EDD',  // Roxo neon
    neonred: '#FF2E63',     // Vermelho neon
}
```

### **Fontes**
- **Principal:** Inter (Google Fonts)
- **Ícones:** Font Awesome 6.4.0

### **Modificar Conteúdo**
1. **Dados pessoais:** Edite as seções no `index.html`
2. **Imagens:** Substitua arquivos na pasta `images/`
3. **Estilos:** Modifique `styles.css` para customizações
4. **Cores:** Ajuste a configuração do Tailwind no `<head>`

## 📊 Features Técnicas

### **Responsividade**
- Breakpoints: Mobile (< 768px), Tablet (768px+), Desktop (1024px+)
- Grid system adaptativo
- Imagens flexíveis
- Menu mobile com hamburger

### **Acessibilidade**
- Estrutura semântica (HTML5)
- Alt text em todas as imagens
- Contraste adequado (WCAG)
- Navegação por teclado

### **SEO**
- Meta tags otimizadas
- Structured data (Schema.org potencial)
- URLs amigáveis
- Performance otimizada

## 🤝 Contribuição

Sugestões e melhorias são sempre bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Carlos Vinicius Garcia Zanonato**
- 📧 Email: [viniciuszanona@gmail.com](mailto:viniciuszanona@gmail.com)
- 💼 LinkedIn: [carlos-vinicius-garcia-zanonato](https://www.linkedin.com/in/carlos-vinicius-garcia-zanonato-453832346)
- 🐱 GitHub: [@ViniciusZanonato](https://github.com/ViniciusZanonato)
- 📍 Localização: Restinga Sêca, RS, Brasil

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no repositório!**

🚀 **[Ver Site Online](https://viniciuszanonato.github.io)** | 💼 **[LinkedIn](https://www.linkedin.com/in/carlos-vinicius-garcia-zanonato-453832346)** | 📧 **[Email](mailto:viniciuszanona@gmail.com)**


/**
 * JUN's PORTFOLIO - Interactive JavaScript
 * Modern, Lightweight, Robust Mobile Navigation & Modal
 */

/* ==========================================================================
   Header Scroll Effect
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   Mobile Navigation Drawer & Smooth Scroll
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileNav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && e.target !== toggleBtn) {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   Smooth Anchor Scrolling with Header Offset
   ========================================================================== */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Close mobile drawer if open
      const mobileNav = document.getElementById('mobileNav');
      const toggleBtn = document.querySelector('.menu-toggle');
      if (mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      }

      // Smooth scroll with header height offset
      setTimeout(() => {
        const header = document.querySelector('.site-header');
        const headerOffset = header ? header.offsetHeight : 70;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth'
        });
      }, 10);
    });
  });
}

/* ==========================================================================
   Works Category Filtering
   ========================================================================== */
function initWorksFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const workCards = document.querySelectorAll('.work-item-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      workCards.forEach(card => {
        const cats = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || cats.includes(filterVal)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Works Modal Data & Handler (All 6 Works Included)
   ========================================================================== */
const worksData = {
  nextbridge: {
    title: '株式会社NextBridge コーポレートサイト',
    subtitle: 'BtoB SaaS 企業向け公式サイト（全5ページ）',
    category: 'コーポレートサイト / BtoB',
    period: '約2週間',
    tools: 'HTML5, CSS3, JavaScript, レスポンシブ対応, GitHub',
    role: '設計 / デザイン / コーディング',
    image: 'images/work-nextbridge.svg',
    targetLink: '../NextBridge_LP/index.html',
    overview: '急成長するBtoB SaaS企業を想定した信頼感と先進性を両立するコーポレートサイトです。トップページのほか、サービス紹介、会社概要、採用情報、お問い合わせの全5ページを網羅し構築しました。',
    points: [
      '信頼感を与える「深いネイビー」と「高彩度ブルー」による洗練されたカラー設計',
      '数字で見る実績セクションにおけるJavaScriptカウントアップアニメーション',
      'サービス詳細ページでのFAQアコーディオンUIによる直感的な情報整理',
      'お問い合わせフォームにおける入力バリデーションおよび送信完了モーダル'
    ]
  },
  urbancloset: {
    title: 'URBAN CLOSET ブランド＆ECサイト',
    subtitle: 'ミニマル・モードなジェンダーレスアパレルブランド',
    category: 'ブランドサイト / EC / ルックブック',
    period: '約2週間',
    tools: 'HTML5, CSS3, JavaScript, Vercelデプロイ',
    role: 'デザイン / コーディング',
    image: 'images/work-urbancloset.svg',
    targetLink: '../URBAN%20CLOSET/index.html',
    overview: '都市で暮らす人々へ向けたジェンダーレスアパレルブランドの公式サイトです。余白を贅沢に使った誌面風のルックブックと、商品一覧・詳細ページを含む複数ページ構成です。',
    points: [
      'ハイブランドのような洗練された余白感とタイポグラフィ（Inter & Noto Sans JP）',
      'ルックブックでの直感的なビジュアルギャラリー表示',
      'カラーやサイズ選択が可能な商品詳細UI設計',
      'スマートフォンでの閲覧を最優先したレスポンシブなグリッドレイアウト'
    ]
  },
  sole: {
    title: 'Trattoria SOLE（トラットリア ソーレ）',
    subtitle: '代々木上原の本格イタリアンレストラン',
    category: '飲食店 / 店舗サイト / 予約導線',
    period: '約10日',
    tools: 'HTML5, CSS3, JavaScript, レスポンシブ対応',
    role: 'デザイン / コーディング',
    image: 'images/work-sole.svg',
    targetLink: '../Trattoria%20SOLE/index.html',
    overview: '代々木上原に佇む老舗本格イタリアンのWebサイトです。温かみのあるクラシックなトーンで料理のこだわりを伝え、ディナーや記念日のWEB予約導線をスムーズに設計しました。',
    points: [
      '料理とワインのシズル感を引き立てるダークウッド＆ゴールドの高級感ある配色',
      'メニューと厳選ワインリストをわかりやすく切り替えるタブ機能',
      'ヘッダーおよびスクロール中に常時目に入る固定WEB予約・電話CTAボタン',
      '営業時間やアクセス（代々木上原駅徒歩3分）を迷わず確認できるフッター設計'
    ]
  },
  blossom: {
    title: 'Cafe Blossom（カフェ ブロッサム）',
    subtitle: '商店街の温もりカフェ 新規オープン告知LP',
    category: 'LP / 集客特化 / SNS連携',
    period: '約1週間',
    tools: 'HTML5, CSS3, JavaScript',
    role: 'デザイン / コーディング',
    image: 'images/work-blossom.svg',
    targetLink: '../Cafe%20Blossom_LP/index.html',
    overview: '商店街に新しくオープンする地域密着型カフェの集客用ランディングページです。親しみやすいフォントと丸みのあるデザインで、地域住民の来店を促進します。',
    points: [
      '思わず立ち寄りたくなる温かみのある丸ゴシック（Zen Maru Gothic）と柔らかなイエロー配色',
      'ページ上部のオープン告知バナーとInstagramフォローによる特典訴求',
      '自家焙煎珈琲や手作りスイーツの魅力を写真とアイコンでわかりやすく提示',
      '地図情報やモーニング営業の案内で来店時の不安を解消'
    ]
  },
  riche: {
    title: 'Hair Salon RICHE（リッシュ）サロンLP',
    subtitle: '大人の上質プライベートヘアサロン 公式LP',
    category: 'LP / 美容室サロン / Web予約導線',
    period: '約1週間',
    tools: 'HTML5, CSS3, JavaScript, レスポンシブ対応',
    role: 'デザイン / コーディング',
    image: 'images/work-riche.svg',
    targetLink: '../Hair%20Salon%20RICHE%E2%80%97LP/index.html',
    overview: '丁寧なカウンセリングと上質なプライベート空間が魅力のヘアサロン「RICHE」の集客・ブランディングLPです。落ち着いたトーンでサロンの強みを伝え、Web予約への導線をスムーズに整備しました。',
    points: [
      '洗練された清潔感と安心感を与えるグレージュ×ゴールドの上質なトーン設計',
      'スタイリスト紹介、施術メニュー表、料金一覧の分かりやすいレイアウト',
      'スマートフォンでの閲覧を意識した固定WEB予約ボタンの配置',
      'サロンへのアクセス（最寄り駅・地図）や営業時間情報の明確な提示'
    ]
  },
  fitbase: {
    title: 'fitbase（フィットベース）パーソナルジムLP',
    subtitle: '理想の身体をつくるパーソナルフィットネス 入会促進LP',
    category: 'LP / フィットネスジム / CV導線特化',
    period: '約1週間',
    tools: 'HTML5, CSS3, JavaScript, レスポンシブ対応',
    role: 'デザイン / コーディング',
    image: 'images/work-fitbase.svg',
    targetLink: '../fitbase-lp/index.html',
    overview: 'アクティブかつエネルギッシュな印象で、無料カウンセリング・体験トレーニングへの入会申し込みを促進するランディングページです。',
    points: [
      'モチベーションを高めるエネルギッシュなビジュアル構成とコントラスト配色',
      '3大特徴（完全個室・専属トレーナー・食事指導）をアイコンと数字で強調',
      '料金プランの明瞭な提示と、期間限定キャンペーンバナーによる成約率向上',
      'スクロールに合わせて追従する体験予約CTAボタンの実装'
    ]
  }
};

function initWorksModal() {
  const modalOverlay = document.getElementById('worksModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openBtns = document.querySelectorAll('.btn-open-modal');
  if (!modalOverlay || !closeBtn) return;

  const modalTitle = document.getElementById('modalWorkTitle');
  const modalSubtitle = document.getElementById('modalWorkSubtitle');
  const modalImage = document.getElementById('modalWorkImage');
  const modalCategory = document.getElementById('modalWorkCategory');
  const modalPeriod = document.getElementById('modalWorkPeriod');
  const modalTools = document.getElementById('modalWorkTools');
  const modalRole = document.getElementById('modalWorkRole');
  const modalOverview = document.getElementById('modalWorkOverview');
  const modalPointsList = document.getElementById('modalWorkPoints');
  const modalTargetLink = document.getElementById('modalTargetLink');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const workId = btn.getAttribute('data-work-id');
      const data = worksData[workId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;

      modalImage.onerror = function() {
        if (this.src.indexOf('images/') !== -1) {
          this.src = this.src.replace('images/', '');
        }
      };
      modalImage.src = data.image;
      modalImage.alt = data.title;

      modalCategory.textContent = data.category;
      modalPeriod.textContent = data.period;
      modalTools.textContent = data.tools;
      modalRole.textContent = data.role;
      modalOverview.textContent = data.overview;

      modalPointsList.innerHTML = '';
      data.points.forEach(point => {
        const li = document.createElement('li');
        li.style.marginBottom = '0.4rem';
        li.textContent = '・ ' + point;
        modalPointsList.appendChild(li);
      });

      if (modalTargetLink) {
        modalTargetLink.href = data.targetLink;
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Contact Form Simulation & Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const thanksModal = document.getElementById('thanksModal');
  const thanksCloseBtn = document.getElementById('thanksCloseBtn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      form.reset();

      if (thanksModal) {
        thanksModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        alert('お問い合わせありがとうございます。メッセージが正常に送信されました。');
      }
    }, 800);
  });

  if (thanksCloseBtn && thanksModal) {
    thanksCloseBtn.addEventListener('click', () => {
      thanksModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    thanksModal.addEventListener('click', (e) => {
      if (e.target === thanksModal) {
        thanksModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   Active Nav Link Highlighting via IntersectionObserver
   ========================================================================== */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header-nav .nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-25% 0px -70% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

function runAllInits() {
  initHeader();
  initMobileNav();
  initSmoothScroll();
  initWorksFilter();
  initWorksModal();
  initContactForm();
  initBackToTop();
  initActiveNavLink();
}

if (!window.__PORTFOLIO_INITIALIZED__) {
  window.__PORTFOLIO_INITIALIZED__ = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllInits);
  } else {
    runAllInits();
  }
}

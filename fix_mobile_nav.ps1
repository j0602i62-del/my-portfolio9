$PSScriptRoot = (Get-Item -Path ".").FullName
$htmlPath = Join-Path $PSScriptRoot "index.html"
$content = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# ==========================================
# 1. Update CSS
# ==========================================
$oldCss = @'
/* Mobile Hamburger Toggle */
.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 1.5px;
  background-color: var(--ink-primary);
  transition: var(--transition-smooth);
}

/* Mobile Nav Drawer */
.mobile-nav {
  position: fixed;
  top: 76px;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid var(--border-medium);
  box-shadow: var(--shadow-lg);
  padding: 2rem 1.5rem;
  display: none;
  flex-direction: column;
  gap: 1.1rem;
  z-index: 999;
}

.mobile-nav.open {
  display: flex;
}

.mobile-nav .nav-link {
  font-size: 1.25rem;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 0.65rem;
}
'@

$newCss = @'
/* Mobile Hamburger Toggle */
.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  padding: 0;
  margin: 0;
  background: transparent;
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: relative;
  z-index: 1001;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: var(--transition-fast);
}

.menu-toggle:hover {
  background-color: var(--bg-secondary);
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--ink-primary);
  border-radius: 2px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
  pointer-events: none;
}

/* Morph to Close Icon (✕) when open */
.menu-toggle.is-active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle.is-active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.menu-toggle.is-active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Nav Drawer (Fixed, Independent of Header to prevent backdrop-filter clipping) */
.mobile-nav {
  position: fixed;
  top: 66px;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid var(--border-medium);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.14);
  z-index: 9999;
  display: none;
  max-height: calc(100vh - 66px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  animation: slideDownNav 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideDownNav {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-nav.open {
  display: block !important;
}

.mobile-nav-inner {
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem 2rem;
  gap: 0.85rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  font-family: var(--font-ja);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--ink-primary);
  border-bottom: 1px solid var(--border-light);
  padding: 0.85rem 0.5rem;
  text-decoration: none;
  transition: var(--transition-fast);
}

.mobile-nav-link:hover,
.mobile-nav-link:active {
  color: var(--accent-navy);
  padding-left: 0.85rem;
}

.mobile-nav-num {
  font-family: var(--font-en);
  font-size: 0.85rem;
  color: var(--accent-blue);
  font-weight: 700;
  margin-right: 0.75rem;
}

.mobile-nav-btn {
  margin-top: 1rem;
  text-align: center;
  justify-content: center;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
}

/* Mobile Nav Backdrop Overlay */
.mobile-nav-backdrop {
  position: fixed;
  top: 66px;
  left: 0;
  width: 100%;
  height: calc(100vh - 66px);
  background-color: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 9998;
  display: none;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.mobile-nav-backdrop.open {
  display: block !important;
  opacity: 1;
}
'@

if ($content.Contains($oldCss)) {
    $content = $content.Replace($oldCss, $newCss)
    Write-Host "Updated CSS for mobile menu!"
} else {
    Write-Warning "Could not find exact oldCss block, using regex"
    $regexCss = '(?s)/\* Mobile Hamburger Toggle \*/.*?\.mobile-nav \.nav-link \{[^}]+\}'
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, $regexCss, $newCss)
    Write-Host "Replaced CSS via regex!"
}

# ==========================================
# 2. Update Header HTML & Move mobile-nav outside header
# ==========================================
$oldHtml = @'
      <!-- Mobile Hamburger Button -->
      <button class="menu-toggle" aria-label="メニューを開く" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Drawer Menu -->
    <div class="mobile-nav" id="mobileNav">
      <a href="#about" class="nav-link">About（私について）</a>
      <a href="#skills" class="nav-link">Skills（できること）</a>
      <a href="#works" class="nav-link">Works（制作実績）</a>
      <a href="#strengths" class="nav-link">Strengths（選ばれる理由）</a>
      <a href="#flow" class="nav-link">Flow（ご依頼の流れ）</a>
      <a href="#contact" class="btn btn-primary" style="margin-top: 0.5rem;">お問い合わせ</a>
    </div>
  </header>
'@

$newHtml = @'
      <!-- Mobile Hamburger Button -->
      <button type="button" class="menu-toggle" id="menuToggle" aria-label="メニューを開閉する" aria-expanded="false" aria-controls="mobileNav">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <!-- Mobile Drawer Menu (Placed outside header to prevent backdrop-filter clipping) -->
  <div class="mobile-nav" id="mobileNav" aria-hidden="true">
    <div class="mobile-nav-inner">
      <a href="#about" class="mobile-nav-link"><span class="mobile-nav-num">01</span>About（私について）</a>
      <a href="#skills" class="mobile-nav-link"><span class="mobile-nav-num">02</span>Skills（できること）</a>
      <a href="#works" class="mobile-nav-link"><span class="mobile-nav-num">03</span>Works（制作実績）</a>
      <a href="#strengths" class="mobile-nav-link"><span class="mobile-nav-num">04</span>Strengths（選ばれる理由）</a>
      <a href="#flow" class="mobile-nav-link"><span class="mobile-nav-num">05</span>Flow（ご依頼の流れ）</a>
      <a href="#contact" class="btn btn-primary mobile-nav-btn">お問い合わせ</a>
    </div>
  </div>
  <div class="mobile-nav-backdrop" id="mobileNavBackdrop"></div>
'@

if ($content.Contains($oldHtml)) {
    $content = $content.Replace($oldHtml, $newHtml)
    Write-Host "Updated HTML for mobile menu and header!"
} else {
    Write-Warning "Could not find exact oldHtml block, using regex"
    $regexHtml = '(?s)<button class="menu-toggle".*?</div>\s*</header>'
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, $regexHtml, $newHtml)
    Write-Host "Replaced HTML via regex!"
}

# ==========================================
# 3. Update JavaScript initMobileNav and initSmoothScroll
# ==========================================
$oldJs = @'
  function initMobileNav() {
    var toggleBtn = document.querySelector('.menu-toggle');
    var mobileNav = document.getElementById('mobileNav');
    if (!toggleBtn || !mobileNav) return;

    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = mobileNav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', function(e) {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && e.target !== toggleBtn) {
        mobileNav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (!href || href === '#' || href.length <= 1) return;
        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        var mobileNav = document.getElementById('mobileNav');
        var toggleBtn = document.querySelector('.menu-toggle');
        if (mobileNav && mobileNav.classList.contains('open')) {
          mobileNav.classList.remove('open');
          if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        }

        setTimeout(function() {
          var header = document.querySelector('.site-header');
          var headerOffset = header ? header.offsetHeight : 70;
          var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth'
          });
        }, 10);
      });
    });
  }
'@

$newJs = @'
  function initMobileNav() {
    var toggleBtn = document.querySelector('.menu-toggle');
    var mobileNav = document.getElementById('mobileNav');
    var backdrop = document.getElementById('mobileNavBackdrop');
    if (!toggleBtn || !mobileNav) return;

    function openMenu() {
      mobileNav.classList.add('open');
      mobileNav.setAttribute('aria-hidden', 'false');
      toggleBtn.classList.add('is-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    function toggleMenu(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (mobileNav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    toggleBtn.addEventListener('click', toggleMenu);

    if (backdrop) {
      backdrop.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
    }

    // Close when clicking any link inside mobileNav
    var navLinks = mobileNav.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function() {
        closeMenu();
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close on resize beyond tablet/mobile
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (!href || href === '#' || href.length <= 1) return;
        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        var mobileNav = document.getElementById('mobileNav');
        var toggleBtn = document.querySelector('.menu-toggle');
        var backdrop = document.getElementById('mobileNavBackdrop');
        if (mobileNav && mobileNav.classList.contains('open')) {
          mobileNav.classList.remove('open');
          mobileNav.setAttribute('aria-hidden', 'true');
          if (toggleBtn) {
            toggleBtn.classList.remove('is-active');
            toggleBtn.setAttribute('aria-expanded', 'false');
          }
          if (backdrop) backdrop.classList.remove('open');
          document.body.style.overflow = '';
        }

        setTimeout(function() {
          var header = document.querySelector('.site-header');
          var headerOffset = header ? header.offsetHeight : 66;
          var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth'
          });
        }, 50);
      });
    }
  }
'@

if ($content.Contains($oldJs)) {
    $content = $content.Replace($oldJs, $newJs)
    Write-Host "Updated JavaScript for mobile menu!"
} else {
    Write-Warning "Could not find exact oldJs block, using regex"
    $regexJs = '(?s)function initMobileNav\(\) \{.*?function initWorksFilter\(\)'
    $replacementWithNext = $newJs + "`n`n  function initWorksFilter()"
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, $regexJs, $replacementWithNext)
    Write-Host "Replaced JS via regex!"
}

[System.IO.File]::WriteAllText($htmlPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Saved index.html successfully!"

const sectionIds = [
  "#home",
  "#blackpink",
  "#profile",
  "#album",
  "#gallery",
  "#notice",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[href="${id}"]`)
);
const visibleSections = sectionIds.map(() => false);
let activeNavItem = navItems[0];

const options = {
  rootMargin: "-20% 0px 0px 0px",
};
const observer = new IntersectionObserver(observercallback, options);
sections.forEach((section) => observer.observe(section));

function observercallback(entries) {
  let selectLastOne;
  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;
    selectLastOne = index === sectionIds.length - 1 && entry.isIntersecting;
  });

  const navIndex = selectLastOne
    ? sectionIds.length - 1
    : findFristIntersecting(visibleSections);
  selectNavItem(navIndex);
}

function findFristIntersecting(intersections) {
  const index = intersections.indexOf(true);
  return index >= 0 ? index : 0;
}

function selectNavItem(index) {
  const navItem = navItems[index];
  if (!navItem) return;
  activeNavItem.classList.remove("active");
  activeNavItem = navItem;
  activeNavItem.classList.add("active");
}

function addBakuganCard(imagePath, gPower, description) {
    // Создаем новый элемент bakugan_card
    const newCard = document.createElement('div');
    newCard.classList.add('bakugan_card');

    // Создаем содержимое нового элемента bakugan_card
    newCard.innerHTML = `
        <div class="bakugan_photo">
            <img draggable="false" src="${imagePath}" alt="Bakugan Photo" class="bg_bakugan_photo">
            <div class="g_power">${gPower} G</div>
            <div class="bakugan_info"><i class="fa-sharp fa-solid fa-info"></i></div>
            <div class="bakugan_cancel"><i class="fa fa-circle-minus" aria-hidden="true"></i></div>
            <div class="attribute_photo">
                <img draggable="false" src="images/attribute icons/100000.png" alt="Bakugan Photo" class="choose_attr_baku_info">
                <img draggable="false" src="images/attribute icons/010000.png" alt="Bakugan Photo" class="choose_attr_baku_info">
                <img draggable="false" src="images/attribute icons/001000.png" alt="Bakugan Photo" class="choose_attr_baku_info">
                <img draggable="false" src="images/attribute icons/000100.png" alt="Bakugan Photo" class="choose_attr_baku_info">
                <img draggable="false" src="images/attribute icons/000010.png" alt="Bakugan Photo" class="choose_attr_baku_info">
                <img draggable="false" src="images/attribute icons/000001.png" alt="Bakugan Photo" class="choose_attr_baku_info">
            </div>
        </div>
        <div class="description">${description}</div>
    `;

    // Добавляем новый элемент bakugan_card в bakugan_container
    const container = document.querySelector('.bakugan_container');
    container.appendChild(newCard);
}

// Вызываем функцию для добавления bakugan_card при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
    addBakuganCard('images/bakugan icons/Aquos/aquos_alpha_hydranoid.png', 250, 'Alpha hydranoid 1500P');
});
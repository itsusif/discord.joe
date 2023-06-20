class EmbedBuilder {

    setColor(color) {
        this['color'] = Number(color);
        return this;
    }

    setTitle(title) {
        this['title'] = title;
        return this;
    }

    setDescription(description) {
        this['description'] = description;
        return this;
    }

}

module.exports = function () {
    return new EmbedBuilder();
};

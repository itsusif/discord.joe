class EmbedBuilder {
    constructor() {
        this['thumbnail'] = {};
        this['author'] = {};
        this['footer'] = {};
        this['image'] = {};
        this['fields'] = [];
    }

    setColor(color) {
        if (typeof color == 'string') {
            const number = parseInt(color.replace(/^#/, ''), 16);
            this['color'] = Number(number);
        } else {
            this['color'] = Number(color);
        }
        return this;
    }

    setTitle(title, url) {
        if (title) this['title'] = title;
        if (url) this['url'] = url;
        return this;
    }

    setDescription(description) {
        this['description'] = description;
        return this;
    }

    setTimestamp(time) {
        if (!time) time = new Date();
        this['timestamp'] = new Date(time);
        return this;
    }

    setAuthor(name, url, icon_url) {
        if (typeof name == 'object') {
            this['author'] = name;
        } else {
            this['author']['name'] = name;
            this['author']['url'] = url;
            this['author']['icon_url'] = icon_url;
        }
        return this;
    }

    setThumbnail(url) {
        this['thumbnail']['url'] = url;
        return this;
    }

    setImage(url) {
        this['image']['url'] = url;
        return this;
    }

    setFooter(text, icon_url) {
        if (typeof text == 'object') {
            this['footer'] = text;
        } else {
            this['footer']['text'] = text;
            this['footer']['icon_url'] = icon_url;
        }
        return this;
    }

    addField(name, value, inline) {
        const field = {
            name: name,
            value: value,
            inline: inline
        };
        this['fields'].push(field);
        return this;
    }

    addFields(...fields) {
        fields.forEach((field) => {
            if (Array.isArray(field)) {
                field.forEach((innerField) => {
                    if (typeof innerField === 'object') {
                        this['fields'].push(innerField);
                    }
                });
            } else if (typeof field === 'object') {
                this['fields'].push(field);
            }
        });
        return this;
    }
}

module.exports = function () {
    return new EmbedBuilder();
};

export class TrendItem {
    trending_text:string
    name: string;
    tweets: string;

    constructor(trending_text:string, name: string, tweets: string) {
        this.trending_text = trending_text;
        this.name = name;
        this.tweets = tweets;
    }
}
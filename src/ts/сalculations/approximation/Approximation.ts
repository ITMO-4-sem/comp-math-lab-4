
export abstract class Approximation {

    protected isRateValid(rate: number): boolean {
        return ! isNaN(rate) && isFinite(rate);
    }


    protected areRatesValid(...rates: Array<number>): boolean {
        let isValid = true;

        for ( let i = 0; i < rates.length; i++ ) {
            isValid = isValid && this.isRateValid(rates[i]);

            if ( ! isValid ) {
                break;
            }
        }
        return isValid;
    }

}
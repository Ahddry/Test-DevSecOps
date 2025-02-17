package xss

import (
	"fmt"
	"log"
	"html"
	"regexp"
	"net/http"
	"html/template"

	"github.com/julienschmidt/httprouter"

	"github.com/govwa/util"
	"github.com/govwa/util/middleware"
	"github.com/govwa/vulnerability/sqli"
)

type XSS struct{
	Name string
}
func New()XSS{
	return XSS{}
}
func (self XSS)SetRouter(r *httprouter.Router){
	mw := middleware.New()
	r.GET("/xss1", mw.LoggingMiddleware(mw.CapturePanic(mw.AuthCheck(xss1Handler))))
	r.POST("/xss1", mw.LoggingMiddleware(mw.CapturePanic(mw.AuthCheck(xss1Handler))))
	r.GET("/xss2", mw.LoggingMiddleware(mw.CapturePanic(mw.AuthCheck(xss2Handler))))
	r.POST("/xss2", mw.LoggingMiddleware(mw.CapturePanic(mw.AuthCheck(xss2Handler))))
}

func xss1Handler(w http.ResponseWriter, r *http.Request, _ httprouter.Params){

	/* template.HTML is a vulnerable function */

	data := make(map[string]interface{})

	if r.Method == "GET"{

		term := r.FormValue("term")

		if(util.CheckLevel(r)){ //level = high
			term = HTMLEscapeString(term)
		}

		if term == "sql injection"{
			term = "sqli"
		}

		term = removeScriptTag(term)
		vulnDetails := GetExp(term)

		notFound := fmt.Sprintf("<b><i>%s</i></b> not found",term)
		value := fmt.Sprintf("%s", term)

		if term == ""{
			data["term"] = ""
		}else
			data["value"] = template.HTML(value)
			data["term"] = template.HTML(notFound) //vulnerable function
		}

	}
	data["title"] = "Cross Site Scripting"
	util.SafeRender(w,r, "template.xss1", data)
}

func HTMLEscapeString(text string)string{
	filter := regexp.MustCompile("<[^>]*>")
	output := filter.ReplaceAllString(text,"")
	return html.EscapeString(output)
}

func removeScriptTag(text string)string{
	filter := regexp.MustCompile("<script*>.*</script>")
	output := filter.ReplaceAllString(text,"")
	return output
}
func sqli2Handler(w http.ResponseWriter, r *http.Request, _ httprouter.Params){

	uid := r.FormValue("uid")

	p := NewProfile()

	data := make(map[string]interface{}) //data to send to client

	if(!util.CheckLevel(r)){ //level == low
		err := p.UnsafeQueryGetData(uid)
		if err != nil{
			log.Printf("sql error")
		}
	}else{
		err := p.SafeQueryGetData(uid)
		if err != nil{
			data["error"] = "No Data Found"
			log.Printf("prepare error : %s", err.Error())
		}
	}

	data["title"] = "Sql Injection"
	data["name"] = p.Name
	data["city"] = p.City
	data["number"] = p.PhoneNumber
	util.SafeRender(w,r,"template.sqli2",data)

}
